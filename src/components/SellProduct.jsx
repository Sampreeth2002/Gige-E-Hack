import React, { useRef, useCallback } from "react"
import { Link, useHistory } from "react-router-dom"
import { useDataInfo } from "../utils"
import Identicon from "identicon.js"

export const SellProduct = ({ transactions, account, fetchUserInfo }) => {
	const history = useHistory()
	const { data: userInfo } = useDataInfo(fetchUserInfo, "/signUp")

	const productNameRef = useRef()
	const imageUrl1Ref = useRef()
	const imageUrl2Ref = useRef()
	const descriptionRef = useRef()
	const locationRef = useRef()
	const priceRef = useRef()

	console.log(userInfo)

	const handleProductSubmit = useCallback(
		event => {
			event.preventDefault()
			transactions.methods
				.sellProduct(
					productNameRef.current.value,
					imageUrl1Ref.current.value,
					imageUrl2Ref.current.value,
					descriptionRef.current.value,
					locationRef.current.value,
					Number(priceRef.current.value)
				)
				.send({ from: account })
				.on("receipt", receipt => {
					console.log(receipt)
					history.replace("/profile")
				})
				.on("error", error => {
					console.error(error)
				})
		},
		[account, history, transactions.methods]
	)

	return (
		<div>
			<div className='bg-white text-center text-6xl font-bold font-body py-8 text-gray-700'>
				<span className='text-purple-400'>G</span>i<span className='text-blue-400'>G</span>e
				<span>!</span>
			</div>
			<div className='m-auto my-10 md:absolute md:right-10 md:top-6 md:my-0 flex items-center justify-items-center'>
				<Link className='font-bold font-body p-3 px-5 m-3' to='/'>
					Hello {userInfo?.name} 😁
				</Link>
				<Link to='/'>
					<img
						className='w-12 h-12 rounded-full'
						src={`data:image/png;base64,${new Identicon(account, 420).toString()}`}
						alt='userIcon'
					/>
				</Link>
			</div>
			<div className='w-screen flex place-items-center flex-col'>
				<form
					className='w-full sm:w-2/3 h-2/3 md:w-1/2 md:h-full shadow-2xl p-10 font-body'
					onSubmit={handleProductSubmit}
				>
					<div className='text-2xl text-center'>Product Details</div>
					<input
						className='input'
						autoComplete='off'
						type='text'
						ref={productNameRef}
						placeholder='Product Name'
					/>
					<input
						className='input'
						autoComplete='off'
						type='url'
						ref={imageUrl1Ref}
						placeholder='Image Url 1'
					/>
					<input
						className='input'
						autoComplete='off'
						type='url'
						ref={imageUrl2Ref}
						placeholder='Image Url 2'
					/>
					<input
						className='input'
						autoComplete='off'
						type='text'
						ref={descriptionRef}
						placeholder='Description of Product'
					/>
					<input
						className='input'
						autoComplete='off'
						type='text'
						ref={locationRef}
						placeholder='Location'
					/>
					<input
						className='input'
						autoComplete='off'
						type='number'
						ref={priceRef}
						placeholder='Price'
					/>
					<div className='text-center mt-10'>
						<button className='w-48 h-12 bg-purple-300 focus:outline-none'>Submit</button>
					</div>
				</form>
			</div>
		</div>
	)
}
