import { AdForm } from '@/components/AdForm'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/ad/new')({
  component: AdForm,
})

// function NewAd() {
//   const [formData, setFormData] = useState<Omit<AdType, 'id'>>({
//     title: '',
//     description: '',
//     price: 0,
//     owner: '',
//     picture: '',
//     location: '',
//     category: { id: 0, name: '' },
//     tags: [],
//   })

//   const [categories, setCategories] = useState<CategoryType[]>([])

//   useEffect(() => {
//     const fetchData = async () => {
//       const categories = await fetchCategories()
//       setCategories(categories)
//     }
//     fetchData()
//   }, [])

//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
//   ) => {
//     const { name, value } = e.target
//     setFormData({ ...formData, [name]: value })
//   }

//   const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
//     const selectedCategory = categories.find(
//       category => category.id === Number(e.target.value),
//     )
//     if (selectedCategory) {
//       setFormData({ ...formData, category: selectedCategory })
//     }
//   }

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault()
//     // Logique d'envoi des données
//     console.warn(formData)
//   }

//   return (
//     <form onSubmit={handleSubmit}>
//       <div>
//         <label htmlFor="title">Title *</label>
//         <input
//           type="text"
//           id="title"
//           name="title"
//           value={formData.title}
//           onChange={handleChange}
//           required
//         />
//       </div>

//       <div>
//         <label htmlFor="description">Description (optional)</label>
//         <textarea
//           id="description"
//           name="description"
//           value={formData.description}
//           onChange={handleChange}
//         />
//       </div>

//       <div>
//         <label htmlFor="price">Price *</label>
//         <input
//           type="number"
//           id="price"
//           name="price"
//           value={formData.price}
//           onChange={handleChange}
//           required
//         />
//       </div>

//       <div>
//         <label htmlFor="owner">Owner *</label>
//         <input
//           type="text"
//           id="owner"
//           name="owner"
//           value={formData.owner}
//           onChange={handleChange}
//           required
//         />
//       </div>

//       <div>
//         <label htmlFor="picture">Picture URL *</label>
//         <input
//           type="text"
//           id="picture"
//           name="picture"
//           value={formData.picture}
//           onChange={handleChange}
//           required
//         />
//       </div>

//       <div>
//         <label htmlFor="location">Location *</label>
//         <input
//           type="text"
//           id="location"
//           name="location"
//           value={formData.location}
//           onChange={handleChange}
//           required
//         />
//       </div>

//       <div>
//         <label htmlFor="category">Category *</label>
//         <select
//           id="category"
//           name="category"
//           value={formData.category.id}
//           onChange={handleCategoryChange}
//           required
//         >
//           <option value="" disabled>
//             Select category
//           </option>
//           {categories.map(category => (
//             <option key={category.id} value={category.id}>
//               {category.name}
//             </option>
//           ))}
//         </select>
//       </div>

//       <div>
//         <label htmlFor="tags">Tags (optional)</label>
//         <input
//           type="text"
//           id="tags"
//           name="tags"
//           value={formData.tags?.join(', ')}
//           // onChange={e => setFormData({ ...formData, tags: e.target.value.split(', ') })}
//         />
//       </div>

//       <button type="submit">Submit</button>
//     </form>
//   )
// }
