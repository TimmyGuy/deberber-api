<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiProperty;
use ApiPlatform\Core\Annotation\ApiResource;
use Doctrine\ORM\Mapping as ORM;
use Vich\UploaderBundle\Mapping\Annotation as Vich;
use Symfony\Component\HttpFoundation\File\File;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;
use App\Controller\CreateBackgroundAction;

/**
 * @ApiResource(
 *     iri="http://schema.org/MediaObject",
 *     normalizationContext={"groups"={"background_read"}},
 *     collectionOperations={
 *          "post"={
 *              "security"="is_granted('ROLE_ADMIN')",
 *              "controller"=CreateBackgroundAction::class,
 *              "deserialize"=false,
 *              "validation_groups"={"Default", "background_create"},
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
 *                                      },
 *                                      "title"={
 *                                          "type"="string"
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
 *     "get",
 *     "delete"={"security"="is_granted('ROLE_ADMIN')"}
 *   }
 * )
 * @ORM\Entity()
 * @Vich\Uploadable
 */
class Background
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     * @Groups({"background_read"})
     */
    private $id;

    /**
     * @var string|null
     *
     * @ApiProperty(iri="http://schema.org/contentUrl")
     * @Groups({"background_read"})
     */
    public $contentUrl;

    /**
     * @var File|null
     *
     * @Assert\NotNull(groups={"background_create"})
     * @Vich\UploadableField(mapping="backgrounds", fileNameProperty="filePath")
     */
    public $file;

    /**
     * @var string|null
     *
     * @ORM\Column(nullable=true)
     */
    public $filePath;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"background_read", "background_create"})
     */
    private $title;

    /**
     * @var false|int the file type
     * @Groups({"background_read"})
     */
    public $fileType;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getTitle(): ?string
    {
        return $this->title;
    }

    public function setTitle(string $title): self
    {
        $this->title = $title;

        return $this;
    }
}
