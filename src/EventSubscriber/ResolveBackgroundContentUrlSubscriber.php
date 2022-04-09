<?php

namespace App\EventSubscriber;

use ApiPlatform\Core\EventListener\EventPriorities;
use ApiPlatform\Core\Util\RequestAttributesExtractor;
use App\Entity\Background;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Event\ViewEvent;
use Symfony\Component\HttpKernel\KernelEvents;
use Vich\UploaderBundle\Storage\StorageInterface;

class ResolveBackgroundContentUrlSubscriber implements \Symfony\Component\EventDispatcher\EventSubscriberInterface
{
    private $storage;

    public function __construct(StorageInterface $storage)
    {
        $this->storage = $storage;
    }

    /**
     * @inheritDoc
     */
    public static function getSubscribedEvents(): array
    {
        return [
            KernelEvents::VIEW => ['onPreSerialize', EventPriorities::PRE_SERIALIZE]
        ];
    }

    public function onPreSerialize(ViewEvent $event): void
    {
        $controllerResult = $event->getControllerResult();
        $request = $event->getRequest();

        if ($controllerResult instanceof Response || !$request->attributes->getBoolean('_api_respond', true)) {
            return;
        }

        if (!($attributes = RequestAttributesExtractor::extractAttributes($request)) || !\is_a($attributes['resource_class'], Background::class, true)) {
            return;
        }

        $backgrounds = $controllerResult;

        if (!is_iterable($backgrounds)) {
            $backgrounds = [$backgrounds];
        }

        foreach ($backgrounds as $background) {
            if (!$background instanceof Background) {
                continue;
            }

            $background->contentUrl = $this->storage->resolveUri($background, 'file');
        }
    }
}