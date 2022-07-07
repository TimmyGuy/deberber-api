<?php

namespace App\EventSubscriber;

use ApiPlatform\Core\EventListener\EventPriorities;
use App\Entity\Reservation;
use App\Entity\User;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\KernelEvents;
use Symfony\Component\Mailer\Mailer;
use Symfony\Component\Mailer\MailerInterface;
use Symfony\Component\Mime\Email;

class ReservationActionSubscriber  implements \Symfony\Component\EventDispatcher\EventSubscriberInterface
{
    private $mollie;
    private $mailer;

    public function __construct(MailerInterface $mailer)
    {
        $this->mailer = $mailer;
        $this->mollie = new \Mollie\Api\MollieApiClient();
        $this->mollie->setApiKey($_ENV['MOLLIE_API_KEY']);
    }

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

        if ($data instanceof Reservation && $method === Request::METHOD_PUT) {
            if($data->getStatus() === 'pending') {
                $email = (new Email())
                    ->from('no-reply@deberber.nl')
                    ->to($data->getUser()->getEmail())
                    ->subject('De Berber #' . $data->getId() . ' - Betaling verzoek')
                    ->text('Beste Gast,' . PHP_EOL . 'Leuk dat je hebt gekozen om op avontuur te gaan met Herberg De Berber. Via de onderstaande link kun je de reservering definitief maken. Alvast bedankt en we zien je snel.' . PHP_EOL . 'Betalen via: https://www.deberber.nl/pay/' . $data->getId() . PHP_EOL . 'Hartelijke groet,' . PHP_EOL.  'Team De Berber');

                $this->mailer->send($email);
            }
        }

        if ($data instanceof Reservation && $method === Request::METHOD_POST) {
            // Generate random password
            $user = $data->getUser();
            $user->setUsername(uniqid('user_'));
            $user->setPassword(password_hash(bin2hex(random_bytes(10)), PASSWORD_BCRYPT));
            $user->setStatus(User::STATUS_ACTIVE);
            $data->setUser($user);
            $data->setStatus('open');
            $tents = ceil(($data->getAdults() + $data->getChildren()) / 6);
            $data->setTents($tents);
        }
    }
}