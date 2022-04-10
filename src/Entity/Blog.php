<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use ApiPlatform\Core\Annotation\ApiSubresource;
use ApiPlatform\Core\Annotation\ApiProperty;
use App\Repository\BlogRepository;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ApiResource()
 * @ORM\Entity(repositoryClass=BlogRepository::class)
 */
class Blog
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="date")
     */
    private $date;

    /**
     * @ORM\Column(type="text")
     */
    private $content;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $title;

    /**
     * @ORM\Column(type="text", nullable=true)
     */
    private $excerpt;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $slug;

    /**
     * @ORM\Column(type="datetime_immutable", nullable=true)
     */
    private $modifiedAt;

    /**
     * @ORM\Column(type="boolean")
     */
    private $published;

    /**
     * @ORM\ManyToOne(targetEntity=Background::class)
     * @ApiSubresource
     */
    private $background;

    /**
     * @var Image|null
     *
     * @ORM\ManyToOne(targetEntity=Image::class)
     * @ORM\JoinColumn(nullable=true)
     * @ApiProperty(iri="http://schema.org/image")
     */
    private $thumbnail;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getDate(): ?\DateTimeInterface
    {
        return $this->date;
    }

    public function setDate(\DateTimeInterface $date): self
    {
        $this->date = $date;

        return $this;
    }

    public function getContent(): ?string
    {
        return $this->content;
    }

    public function setContent(string $content): self
    {
        $this->content = $content;

        return $this;
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

    public function getExcerpt(): ?string
    {
        return $this->excerpt;
    }

    public function setExcerpt(?string $excerpt): self
    {
        $this->excerpt = $excerpt;

        return $this;
    }

    public function getSlug(): ?string
    {
        return $this->slug;
    }

    public function setSlug(string $slug): self
    {
        $this->slug = $slug;

        return $this;
    }

    public function getModifiedAt(): ?\DateTimeImmutable
    {
        return $this->modifiedAt;
    }

    public function setModifiedAt(?\DateTimeImmutable $modifiedAt): self
    {
        $this->modifiedAt = $modifiedAt;

        return $this;
    }

    public function getPublished(): ?bool
    {
        return $this->published;
    }

    public function setPublished(bool $published): self
    {
        $this->published = $published;

        return $this;
    }

    public function getBackground(): ?background
    {
        return $this->background;
    }

    public function setBackground(?background $background): self
    {
        $this->background = $background;

        return $this;
    }

    public function getThumbnail(): ?Image
    {
        return $this->thumbnail;
    }

    public function setThumbnail(Image $thumbnail): self
    {
        $this->thumbnail = $thumbnail;

        return $this;
    }
}
