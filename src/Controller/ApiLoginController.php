<?php

namespace App\Controller;

use App\Entity\User;
use App\Repository\UserRepository;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Http\Attribute\CurrentUser;

class ApiLoginController extends AbstractController
{
    /**
     * @Route("/api/login", name="api_login")
     */
    public function index(): Response
    {
        $user = $this->getUser();
        if(null == $user) {
            return $this->json([
                'message' => 'Missing credentials',
            ], Response::HTTP_UNAUTHORIZED);
        }

        $token = "2";

        return $this->json([
            'user' => $user->getUserIdentifier(),
            'status' => $user->getStatus(),
            'token' => $token,
        ]);
    }

    /**
     * @Route("/api/register", name="api_register")
     */
    public function register(Request $request, UserPasswordHasherInterface $hasher, ManagerRegistry $doctrine, UserRepository $userRepository): Response
    {
        $requestBody = json_decode($request->getContent(), true);

        $user = new User();
        $user->setUsername($requestBody['username']);
        $user->setEmail($requestBody['email']);
        $user->setFullName($requestBody['full_name']);

        $hashedPassword = $hasher->hashPassword($user, $requestBody['password']);
        $user->setPassword($hashedPassword);

        $user->setRegisteredAt(new \DateTimeImmutable());
        $user->setStatus(User::STATUS_ACTIVE);

        $em = $doctrine->getManager();
        $em->persist($user);
        $em->flush();


//        return $this->json([
//            'id' => $user->getId(),
//            'username' => $user->getUserIdentifier(),
//        ]);
        return $this->json($userRepository->findAll());
    }
}
