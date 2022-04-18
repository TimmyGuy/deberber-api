<?php

namespace App\Controller;

use App\Repository\BlogRepository;
use App\Repository\PageRepository;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

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
}
