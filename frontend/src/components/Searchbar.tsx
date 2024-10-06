import { Search } from 'lucide-react'
import { useState } from 'react'

export function Searchbar() {
  const [isFocused, setIsFocused] = useState(false)

  return (
    <form
      className={`flex items-center w-full transition-all duration-300 ease-in-out ${
        isFocused ? 'border border-[#6F42C1] rounded-full' : 'bg-white border border-white'
      }`}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
    >
      <input
        className="flex-1 h-10 px-4 rounded-l-full outline-none bg-gray-200 text-slate-950"
        type="search"
        placeholder="Rechercher sur thegoodcorner"
      />
      <button
        className="bg-[#6F42C1] text-white h-10 w-12 rounded-r-full flex items-center justify-center"
        type="submit"
      >
        <Search size={20} color="white" />
      </button>
    </form>
  )
}
