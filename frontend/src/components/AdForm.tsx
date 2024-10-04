'use client'

import type { AdDto, CategoryDto, TagDto } from '@tgc/packages'
import type { z } from 'zod'
import { fetchCategories, fetchTags, postAd, updateAd } from '@/api/api'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { zodResolver } from '@hookform/resolvers/zod'
import { AdFormSchema } from '@tgc/packages'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

interface AdFormProps {
  ad?: AdDto
  onSubmitSuccess: () => void
  onCancel: () => void
}
export function AdForm({ ad, onSubmitSuccess, onCancel }: AdFormProps) {
  const [categories, setCategories] = useState<CategoryDto[]>([])
  const [tags, setTags] = useState<TagDto[]>([])
  const [loading, setLoading] = useState(true)

  const form = useForm<z.infer<typeof AdFormSchema>>({
    resolver: zodResolver(AdFormSchema),
    defaultValues: {
      title: ad?.title || '',
      description: ad?.description || '',
      price: ad?.price || 0,
      owner: ad?.owner || '',
      picture: ad?.picture || '',
      location: ad?.location || '',
      category: ad?.category || { id: 0, name: '' },
      tags: ad?.tags || [],
    },
  })

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categories = await fetchCategories()
        const tags = await fetchTags()
        setCategories(categories)
        setTags(tags)
        setLoading(false)
      }
      catch (error) {
        console.error('Erreur lors du chargement des données : ', error)
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const onSubmit = async (values: z.infer<typeof AdFormSchema>) => {
    const parsedData = AdFormSchema.parse(values)
    const preparedData = {
      ...parsedData,
      category: { id: Number(parsedData.category.id) },
      tags: parsedData.tags?.map(tag => ({ id: tag.id })) || [],
    }

    if (ad) {
      try {
        await updateAd(ad.id, preparedData)
        onSubmitSuccess()
      }
      catch (error) {
        console.error('Erreur lors de la mise à jour de l\'annonce:', error)
      }
    }
    else {
      try {
        await postAd(preparedData)
        onSubmitSuccess()
      }
      catch (error) {
        console.error('Erreur lors de la création de l\'annonce:', error)
      }
    }
  }

  if (loading) {
    return <div>Chargement des données...</div> // Ou un spinner de chargement
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Titre</FormLabel>
              <FormControl>
                <input type="text" placeholder="Titre de l'annonce" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <textarea placeholder="Description de l'annonce" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Prix</FormLabel>
              <FormControl>
                <input
                  type="number"
                  placeholder="Prix"
                  {...field}
                  onChange={e => field.onChange(Number(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="owner"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Propriétaire</FormLabel>
              <FormControl>
                <input type="text" placeholder="Nom du propriétaire" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="picture"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Image (URL)</FormLabel>
              <FormControl>
                <input type="url" placeholder="URL de l'image" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Localisation</FormLabel>
              <FormControl>
                <input type="text" placeholder="Localisation de l'annonce" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Catégorie</FormLabel>
              <FormControl>
                <select
                  value={field.value.id}
                  onChange={(e) => {
                    const selectedCategory = categories.find(c => c.id === Number(e.target.value))
                    field.onChange(selectedCategory || { id: 0, name: '' })
                  }}
                >
                  <option value="">Sélectionnez une catégorie</option>
                  {categories.map(category => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="tags"
          render={() => (
            <FormItem>
              <FormLabel>Tags (optionnel)</FormLabel>
              {tags.map(tag => (
                <FormField
                  key={tag.id}
                  control={form.control}
                  name="tags"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value?.some(t => t.id === tag.id)}
                          onCheckedChange={(checked) => {
                            const updatedTags = checked
                              ? [...(field.value || []), { id: tag.id, name: tag.name }]
                              : field.value?.filter(t => t.id !== tag.id) || []
                            field.onChange(updatedTags)
                          }}
                        />
                      </FormControl>
                      <FormLabel className="font-normal">{tag.name}</FormLabel>
                    </FormItem>
                  )}
                />
              ))}
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">{ad ? 'Mettre à jour' : 'Créer'}</Button>
        <Button type="button" onClick={onCancel}>Annuler</Button>
      </form>
    </Form>
  )
}
