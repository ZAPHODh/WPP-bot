let Offer = [];
const handleOffer = (order, offer) => {
	switch (order) {
		case 'add':
			Offer.push(offer);
			return Offer;
		case 'remove':
			Offer = Offer.filter((o) => o.id !== offer);
			return Offer;

		default:
			return Offer;
	}
};
module.exports = { handleOffer };
