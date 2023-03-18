import React from 'react'
import DishItems from '../component/DishItems'
import RowCategories from '../component/RowCategories'
export const Home = () => {
  return (
    <main>
         {/* containts the menu cart and row category and all items (all thing expect banner) */}
        <div>
         {/* all category as a row  */}
         <RowCategories />
         {/* // all items  */}
         <DishItems />
        </div>
    </main>
  )
}
export default Home
