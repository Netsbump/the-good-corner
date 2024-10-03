'use client'

import type { CategoryDto, TagDto } from '@tgc/packages'
import { fetchCategories, fetchTags, postAd } from '@/api/api'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { zodResolver } from '@hookform/resolvers/zod'

import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const adFormSchema = z.object({
  title: z.string().min(2, { message: 'Le titre doit avoir au moins 2 caractères.' }),
  price: z.number().min(1, { message: 'Le prix doit être supérieur à 0.' }),
  owner: z.string().min(1, { message: 'Le propriétaire est obligatoire.' }),
  picture: z.string().url({ message: 'L\'URL de l\'image est invalide.' }),
  location: z.string().min(2, { message: 'La localisation doit avoir au moins 2 caractères.' }),
  category: z.object({
    id: z.number().min(1, { message: 'Une catégorie doit être sélectionnée.' }),
    name: z.string(),
  }),
  tags: z.array(z.object({
    id: z.number().min(1, { message: 'Tag invalide' }),
    name: z.string().min(1, { message: 'Le tag doit avoir un nom' }),
  })).optional(), // Les tags sont optionnels
})

export function AdForm() {
  const [categories, setCategories] = useState<CategoryDto[]>([])
  const [tags, setTags] = useState<TagDto[]>([])
  const [loading, setLoading] = useState(true)
  // Initialisation de React Hook Form avec le schéma Zod
  const form = useForm({
    resolver: zodResolver(adFormSchema),
    defaultValues: {
      title: '',
      price: 0,
      owner: '',
      picture: '',
      location: '',
      category: { id: 0, name: '' }, // Category initialisée
      tags: [], // Les tags initialisés à un tableau vide
    },
  })

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categories = await fetchCategories()
        const tags = await fetchTags()
        setCategories(categories)
        setTags(tags)
        setLoading(false) // Les données sont chargées
      }
      catch (error) {
        console.error('Erreur lors du chargement des données : ', error)
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  // Soumission du formulaire
  const onSubmit = async (values: z.infer<typeof adFormSchema>) => {
    console.warn(values)

    const preparedData = {
      ...values,
      category: values.category.id, // Garde uniquement l'ID de la catégorie
      tags: values.tags?.map(tag => ({ id: tag.id })) || [], // Garde uniquement les ID des tags
    }

    console.warn(preparedData)
  }

  // Si en cours de chargement, on affiche un message ou un spinner
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
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Prix</FormLabel>
              <FormControl>
                <input
                  type="number"
                  placeholder="Prix"
                  {...field}
                  onChange={e => field.onChange(Number(e.target.value))} // Conversion explicite en nombre
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
                <input type="text" placeholder="URL de l'image" {...field} />
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
          name="category.id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Catégorie</FormLabel>
              <FormControl>
                <select
                  value={field.value}
                  onChange={e => field.onChange(Number(e.target.value))} // Converti la valeur en nombre
                >
                  <option value="">Sélectionnez une catégorie</option>
                  {categories.map(category => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                      {' '}
                      {/* Affiche le nom de la catégorie */}
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
                          checked={field.value?.some((t: TagDto) => t.id === tag.id)} // Vérifie si l'objet complet {id, name} est dans le tableau
                          onCheckedChange={(checked) => {
                            const updatedTags = checked
                              ? [...field.value, { id: tag.id, name: tag.name }] // Ajouter l'objet complet {id, name}
                              : field.value?.filter((t: TagDto) => t.id !== tag.id) // Retirer l'objet si la checkbox est décochée
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

        <Button type="submit">Envoyer</Button>
      </form>
    </Form>
  )
}

// export function AdForm() {
//   // Initialisation de React Hook Form avec le schéma Zod
//   const form = useForm({
//     resolver: zodResolver(adFormSchema),
//     defaultValues: {
//       title: '',
//       price: 0,
//       owner: '',
//       picture: '',
//       location: '',
//       category: { id: 0, name: '' }, // Category initialisée
//       tags: [], // Les tags initialisés à un tableau vide
//     },
//   })

//   // Soumission du formulaire
//   const onSubmit = (values: z.infer<typeof adFormSchema>) => {
//     console.warn(values)
//     // Logique d'envoi des données
//   }

//   return (
//     <Form {...form}>
//       <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
//         <FormField
//           control={form.control}
//           name="title"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Titre</FormLabel>
//               <FormControl>
//                 <input type="text" placeholder="Titre de l'annonce" {...field} />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />

//         <FormField
//           control={form.control}
//           name="price"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Prix</FormLabel>
//               <FormControl>
//                 <input type="number" placeholder="Prix" {...field} />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />

//         <FormField
//           control={form.control}
//           name="owner"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Propriétaire</FormLabel>
//               <FormControl>
//                 <input type="text" placeholder="Nom du propriétaire" {...field} />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />

//         <FormField
//           control={form.control}
//           name="picture"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Image (URL)</FormLabel>
//               <FormControl>
//                 <input type="text" placeholder="URL de l'image" {...field} />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />

//         <FormField
//           control={form.control}
//           name="location"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Localisation</FormLabel>
//               <FormControl>
//                 <input type="text" placeholder="Localisation de l'annonce" {...field} />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />

//         <FormField
//           control={form.control}
//           name="category.id"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Catégorie (ID)</FormLabel>
//               <FormControl>
//                 <input type="number" placeholder="ID de la catégorie" {...field} />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />

//         <FormField
//           control={form.control}
//           name="tags"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Tags (optionnel)</FormLabel>
//               <FormControl>
//                 <input
//                   type="text"
//                   placeholder="Tags (séparés par une virgule)"
//                   {...field}
//                   onChange={(e) => {
//                     const tags = e.target.value.split(',').map((tag, index) => ({
//                       id: index + 1,
//                       name: tag.trim(),
//                     }))
//                     field.onChange(tags) // On met à jour le tableau des tags
//                   }}
//                 />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />

//         <Button type="submit">Envoyer</Button>
//       </form>
//     </Form>
//   )
// }
