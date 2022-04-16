<?php

namespace App\Controller;

use App\Entity\Image;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;
use Vich\UploaderBundle\Storage\StorageInterface;
use Symfony\Component\Routing\Annotation\Route;

class UploadController extends AbstractController
{
    private $storage;

    public function __construct(StorageInterface $storage)
    {
        $this->storage = $storage;
    }

    /**
     * @param Request $request
     * @param ManagerRegistry $doctrine
     * @return JsonResponse
     * @Route ("/api/uploadByFile", name="upload")
     */
    function uploadByFile(Request $request, ManagerRegistry $doctrine): JsonResponse
    {
        $uploadedFile = $request->files->get('file');
        if (!$uploadedFile) {
            throw new BadRequestHttpException('"file" is required');
        }

        $image = new Image();
        $image->file = $uploadedFile;

        $manager = $doctrine->getManager();
        $manager->persist($image);
        $manager->flush();

        $image->contentUrl = $this->storage->resolveUri($image, 'file');

        return $this->json([
            'success' => 1,
            'file' => [
                'url' => $image->contentUrl,
            ]
        ]);

    }
}
