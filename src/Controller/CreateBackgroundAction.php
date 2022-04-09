<?php

namespace App\Controller;

use App\Entity\Background;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;

class CreateBackgroundAction
{
    public function __invoke(Request $request): Background
    {
        $uploadedFile = $request->files->get('file');
        if (!$uploadedFile) {
            throw new BadRequestHttpException('"file" is required');
        }

        $background = new Background();
        $background->file = $uploadedFile;

        return $background;
    }
}