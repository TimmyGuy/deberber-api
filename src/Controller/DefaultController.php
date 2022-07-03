<?php

namespace App\Controller;

use App\Repository\BlogRepository;
use App\Repository\PageRepository;
use App\Repository\ReservationRepository;
use Doctrine\Persistence\ManagerRegistry;
use Mollie\Api\MollieApiClient;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Validator\Constraints\Json;

class DefaultController extends AbstractController
{
    /**
     * @Route("/{path}", name="app_default", requirements={"path"="^(?!api).*$"})
     */
    public function index($path): Response
    {
        return $this->render('default/index.html.twig');
    }

    /**
     * @Route("/api/blogs/slug/{slug}", name="get_blog_by_slug")
     */
    public function getBlogBySlug($slug, BlogRepository $blogRepository): JsonResponse
    {
        $blog = $blogRepository->findOneBy(['slug' => $slug, 'published' => true]);
        return $this->json($blog);
    }

    /**
     * @Route("/api/pages/slug/{slug}", name="get_page_by_slug")
     */
    public function getPageBySlug($slug, PageRepository $pageRepository): JsonResponse
    {
        $blog = $pageRepository->findOneBy(['slug' => $slug, 'published' => true]);
        return $this->json($blog);
    }

    /**
     * @Route("/api/blogs/latest", name="get_latest_blogs")
     */
    public function getLatestBlogs(BlogRepository $blogRepository): JsonResponse
    {
        $blogs = $blogRepository->findBy(['published' => true], ['date' => 'DESC'], 3);
        return $this->json($blogs);
    }

    /**
     * @Route("/api/payment-webhook", name="payment_webhook")
     */
    public function paymentWebhook(Request $request, ReservationRepository $reservationRepository): Response
    {
        $mollie = new MollieApiClient();
        $mollie->setApiKey($_ENV['MOLLIE_API_KEY']);
        $id = $request->get('id');
        $payment = $mollie->payments->get($id);
        $reservation = $reservationRepository->findOneBy(['transactionId' => $id]);

        $reservation->setStatus($payment->status);
        $reservationRepository->add($reservation, true);

        return new Response('', Response::HTTP_OK);
    }

    /**
     * @Route("/api/checkout-url", name="checkout_url")
     */
    public function getCheckoutUrl(Request $request, ReservationRepository $reservationRepository): JsonResponse
    {
        $mollie = new MollieApiClient();
        $mollie->setApiKey($_ENV['MOLLIE_API_KEY']);
        $payload = json_decode($request->getContent(), true);
        $id = $payload['id'];
        $reservation = $reservationRepository->find($id);

        if ($reservation->getStatus() === 'pending') {
            $payment = $mollie->payments->create([
                "amount" => [
                    "currency" => "EUR",
                    "value" => number_format($reservation->getPrice(), 2)
                ],
                "description" => "De Berber #" . $reservation->getId(),
                "redirectUrl" => "https://deberber.nl/paid/" . $reservation->getId(),
                "webhookUrl" => "https://api.deberber.nl/api/payment-webhook"
            ]);
            $reservation->setTransactionId($payment->id);
            return new JsonResponse(['url' => $payment->getCheckoutUrl()], Response::HTTP_OK);
        }

            return new JsonResponse(['err' => 'Could not generate URL'], Response::HTTP_OK);
    }
}
