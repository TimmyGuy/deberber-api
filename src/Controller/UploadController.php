<?php

namespace App\Controller;

use App\Entity\Image;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Mime\Part\DataPart;
use Symfony\Component\Mime\Part\Multipart\FormDataPart;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Contracts\HttpClient\HttpClientInterface;

class UploadController extends AbstractController
{
    private $client;

    public function __construct(HttpClientInterface $client)
    {
        $this->client = $client;
    }

    /**
     * @Route("/api/uploadByFile", name="app_upload_by_file", methods={"POST"})
     */
    public function index(Request $request): Response
    {
        $file = $request->files->get('file');

        $file->getClientOriginalName();

//        $formData = new FormDataPart([
//            'file' => $file
//        ]);

//        $response = $this->client->request('POST', 'http://127.0.0.1:8000/api/images', [
//            'body' => $formData->toIterable(),
//            'headers' => $formData->getPreparedHeaders()->toArray()
//        ]);

//        $content = $response->toArray();

//        return $this->json($response->toArray());
        return $this->json($file->getClientOriginalName());
    }

    function uploadFile($file) {
//        if ($file) {
//            $originalFilename = pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME);
//            // this is needed to safely include the file name as part of the URL
//            $safeFilename = $slugger->slug($originalFilename);
//            $newFilename = $safeFilename.'-'.uniqid().'.'.$file->guessExtension();
//
//            // Move the file to the directory where brochures are stored
//            try {
//                $file->move(
//                    $this->getParameter('brochures_directory'),
//                    $newFilename
//                );
//            } catch (FileException $e) {
//                // ... handle exception if something happens during file upload
//            }
//
//            // updates the 'brochureFilename' property to store the PDF file name
//            // instead of its contents
//            $product->setBrochureFilename($newFilename);
//        }

    }
}
