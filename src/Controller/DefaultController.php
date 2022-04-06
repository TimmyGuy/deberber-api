<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
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
}
