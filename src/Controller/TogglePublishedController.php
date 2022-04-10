<?php

namespace App\Controller;

use App\Entity\Blog;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class TogglePublishedController extends AbstractController
{
    /**
     * @Route("/api/blogs/{id}/toggle", name="app_toggle_published")
     */
    public function index(int $id, ManagerRegistry $manager): Response
    {
        $blog = $manager->getRepository(Blog::class)->find($id);
        $blog->setPublished(!$blog->getPublished());
        $manager->getManager()->persist($blog);
        $manager->getManager()->flush();

        return $this->json([
            'msg' => 'Blog published status toggled',
        ]);
    }
}
