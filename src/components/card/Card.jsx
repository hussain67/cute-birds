import React from "react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { useBirds } from "../../context/birdContext";

const Card = ({ id, name, phone, email, image, favoured }) => {
	const { handleFavourate } = useBirds();

	return (
		<article className="card">
			<div className="card__header">
				<img
					className="card__img"
					src={image.url}
					alt={image.alt}
				/>

				<button
					data-testid={id}
					className="card__icon"
					onClick={() => {
						handleFavourate(id, !favoured);
					}}
				>
					{favoured ? <AiFillHeart /> : <AiOutlineHeart />}
				</button>
			</div>

			<h2 className="card__name">{name}</h2>
			<h3>{phone}</h3>
			<h3>{email}</h3>
		</article>
	);
};

export default Card;
