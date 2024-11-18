'use client'

import { z } from 'zod'
import { CREATE_AD, GET_ALL_CATEGORIES, GET_TAGS, UPDATE_AD } from '@/api/api'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useMutation, useQuery } from '@apollo/client'
import { AdInput, AdQuery } from '@/gql/graphql'

interface AdFormProps {
  ad?: AdQuery['ad'];
  onSubmitSuccess: () => void
  onCancel: () => void
}

const AdFormSchema: z.ZodType<AdInput> = z.object({
  title: z.string().min(2, { message: 'Le titre doit avoir au moins 2 caractères.' }),
  description: z.string().nullable().optional(),
  price: z.number().min(1, { message: 'Le prix doit être supérieur à 0.' }),
  owner: z.string().min(1, { message: 'Le propriétaire est obligatoire.' }),
  picture: z.string().url({ message: "L'URL de l'image est invalide." }),
  location: z.string().min(2, { message: 'La localisation doit avoir au moins 2 caractères.' }),
  category: z.object({
    id: z.string(),
  }),
  tags: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
    })
  ).optional(),
})

export function AdForm({ ad, onSubmitSuccess, onCancel }: AdFormProps) {
  const { data: dataCategories, loading: loadingCategories } = useQuery(GET_ALL_CATEGORIES);
  const { data: dataTags, loading: loadingTags } = useQuery(GET_TAGS);
  const [createMutation] = useMutation(CREATE_AD);
  const [updateMutation] = useMutation(UPDATE_AD);

  const categories = dataCategories?.categories || [];
  const tags = dataTags?.tags || [];

  const form = useForm<z.infer<typeof AdFormSchema>>({
    resolver: zodResolver(AdFormSchema),
    defaultValues: {
      title: ad?.title || '',
      description: ad?.description || '',
      price: ad?.price || 0,
      owner: ad?.owner || '',
      picture: ad?.picture || '',
      location: ad?.location || '',
      category: ad?.category || { id: ''},
      tags: ad?.tags || [],
    },
  })

  const onSubmit = async (values: z.infer<typeof AdFormSchema>) => {
    try {
      const parsedData = AdFormSchema.parse(values)
      const preparedData: AdInput = {
        ...parsedData,
        category: { id: (parsedData.category.id) },
        tags: parsedData.tags?.map(tag => ({ id: tag.id, name: tag.name})) || [],
      }
      
      if (ad) {
        await updateMutation({ variables: { adData: preparedData, updateAdId: ad.id } });
      } else {
        await createMutation({ variables: { adData: preparedData } });
      }
      onSubmitSuccess();

    } catch (error) {
      console.error('Erreur de validation:', error);
    }
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
                <textarea placeholder="Description de l'annonce" {...field} value={field.value ?? ''}/>
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

        {loadingCategories ?
          'Chargement des catégories...' :
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Catégorie</FormLabel>
                <FormControl>
                  <select
                    value={field.value.id ?? ''}
                    onChange={(e) => {
                      const selectedCategory = categories.find(c => c.id === e.target.value)
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
        }


        {loadingTags ?
          'Chargement des tags...' :
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
        }

        <Button type="submit">{ad ? 'Mettre à jour' : 'Créer'}</Button>
        <Button type="button" onClick={onCancel}>Annuler</Button>
      </form>
    </Form>
  )
}
