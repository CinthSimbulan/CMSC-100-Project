import React from 'react'
import TopBar from './TopBar'
import * as FaIcons from 'react-icons/fa'

function LandingPage() {
    return (
        <>
            <TopBar />
            <div className='flex flex-col'>
                <div className='flex justify-between'>
                    <div className='flex flex-col my-14 items-center'>
                        <span className='font-black text-4xl'>Where Freshness Meets Flavor,</span>
                        <span className='text-green-900 font-black text-4xl'>and Every Bite Tells a Story</span>
                        <span className='flex w-1/2 font-serif text-justify mt-10 mr-14'>Our Farm to Table Haven app revolutionizes the food experience by seamlessly connecting consumers with local farms and artisanal producers, ensuring freshness, flavor, and a deeper connection to the food they eat. Through prioritizing local sourcing, promoting sustainability, and celebrating culinary diversity, we empower consumers to make informed choices while supporting regional agriculture.</span>
                    </div>
                    <div className='w-full'></div>
                </div>
                <div className='flex justify-center my-16'>
                    <div className='flex'>
                        <span className='font-extrabold text-orange-400 text-2xl'>BUY L</span>
                        <FaIcons.FaDove className="text-orange-400" size={30} />
                        <span className='font-extrabold text-orange-400 text-2xl'>CAL,</span>
                    </div>
                    <div className='flex'>
                        <span className='font-extrabold text-green-600 text-2xl pl-2'>SUPP</span>
                        <FaIcons.FaLeaf className='text-green-700' size={30} />
                        <span className='font-extrabold text-green-600 text-2xl'>RT FARMERS</span>
                    </div>

                </div>
                <div className='flex justify-evenly'>
                    <div className='-mr-10'>
                        <span className='flex items-center justify-center w-8 h-8 bg-orange-400 text-white rounded-full text-lg font-mono'>1</span>
                    </div>
                    <div className='flex flex-col w-1/5'>
                        <span className='font-extrabold text-green-900 text-xl'>SHOP</span>
                        <span className='font-serif text-sm text-justify'>Explore Freshness - Dive into a bountiful selection of farm-fresh crops and poultry, carefully curated for discerning tastes. Our shop is stocked with the highest quality produce directly from local farms, ensuring you get the best nature has to offer, with new arrivals to discover with every visit. From vibrant heirloom tomatoes to pasture-raised chickens, each item is handpicked to guarantee peak flavor and nutrition, providing you with the freshest ingredients for your culinary adventures.</span>
                    </div>
                    <div className='-mr-10'>
                        <span className='flex items-center justify-center w-8 h-8 bg-orange-400 text-white rounded-full text-lg font-mono'>2</span>
                    </div>
                    <div className='flex flex-col w-1/4'>
                        <span className='font-extrabold text-green-900 text-xl'>ADD TO CART</span>
                        <span className='font-serif text-sm text-justify'>Select Your Harvest - Once you've found your favorites, easily add them to your cart, where you can adjust quantities and explore suggested pairings. Our seamless shopping experience lets you select the finest ingredients with just a few clicks, ensuring your culinary creations are as fresh and flavorful as can be. With detailed product descriptions, you can shop with confidence, knowing the stories behind your food and the care that goes into every harvest.</span>
                    </div>
                    <div className='-mr-10'>
                        <span className='flex items-center justify-center w-8 h-8 bg-orange-400 text-white rounded-full text-lg font-mono'>3</span>
                    </div>
                    <div className='flex flex-col w-1/4'>
                        <span className='font-extrabold text-green-900 text-xl'>RECEIEVE AND ENJOY</span>
                        <span className='font-serif text-sm text-justify'>Savor the Farm's Best - Sit back and relax as we bring the farm to your doorstep, with timely deliveries that preserve the freshness and quality of each item. Enjoy the delightful flavors and nutritional benefits of farm-to-table goodness, knowing that every bite supports local farmers and sustainable practices, enriching both your meals and your community. With our commitment to transparency and traceability, you can trust that your food journey is as wholesome as it is delicious, connecting you directly to the source of your nourishment.</span>
                    </div>
                </div>
            </div>

        </>
    )
}

export default LandingPage
