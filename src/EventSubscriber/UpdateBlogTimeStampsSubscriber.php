<?php

namespace App\EventSubscriber;

use ApiPlatform\Core\EventListener\EventPriorities;
use App\Entity\Blog;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\KernelEvents;

class UpdateBlogTimeStampsSubscriber implements \Symfony\Component\EventDispatcher\EventSubscriberInterface
{

    /**
     * @inheritDoc
     */
    public static function getSubscribedEvents(): array
    {
        return [
            KernelEvents::VIEW => ['onPreWrite', EventPriorities::PRE_WRITE]
        ];
    }

    public function onPreWrite($event): void
    {
        $data = $event->getControllerResult();
        $method = $event->getRequest()->getMethod();

        if ($data instanceof Blog && $method === Request::METHOD_PATCH) {
            $data->setModifiedAt(new \DateTimeImmutable());
        }

        if($data instanceof Blog && $method === Request::METHOD_POST) {
            $data->setDate(new \DateTimeImmutable());
            $data->setPublished(true);
        }
    }
}