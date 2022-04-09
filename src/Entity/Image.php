<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiProperty;
use ApiPlatform\Core\Annotation\ApiResource;
use Doctrine\ORM\Mapping as ORM;
use Vich\UploaderBundle\Mapping\Annotation as Vich;
use Symfony\Component\HttpFoundation\File\File;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;
use App\Controller\CreateImageAction;

/**
 * @ApiResource(
 *     iri="http://schema.org/MediaObject",
 *     normalizationContext={"groups"={"image_read"}},
 *     collectionOperations={
 *          "post"={
 *              "controller"=CreateImageAction::class,
 *              "deserialize"=false,
 *              "validation_groups"={"Default", "image_create"},
 *              "openapi_context"={
 *                  "requestBody"={
 *                      "content"={
 *                          "multipart/form-data"={
 *                              "schema"={
 *                                  "type"="object",
 *                                  "properties"={
 *                                      "file"={
 *                                          "type"="string",
 *                                          "format"="binary"
 *                                      }
 *                                  }
 *                              }
 *                          }
 *                      }
 *                  }
 *              }
 *          },
 *     "get"
 *     },
 *     itemOperations={
 *     "get"
 *   }
 * )
 * @ORM\Entity()
 * @Vich\Uploadable
 */
class Image

{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @var string|null
     *
     * @ApiProperty(iri="http://schema.org/contentUrl")
     * @Groups({"image_read"})
     */
    public $contentUrl;

    /**
     * @var File|null
     *
     * @Assert\NotNull(groups={"image_create"})
     * @Vich\UploadableField(mapping="images", fileNameProperty="filePath")
     */
    public $file;

    /**
     * @var string|null
     *
     * @ORM\Column(nullable=true)
     */
    public $filePath;

    public function getId(): ?int
    {
        return $this->id;
    }
}
