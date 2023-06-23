import tinycolor from "tinycolor2";

const getCorrect = (number) => {
	return number > 255 ? 255 : number < 0 ? 0 : number
}

export default hash => {
	const [r, g, b] = hash.substr(14, 17).split('').map(char => getCorrect(char.charCodeAt(0)))

	return{
		color : tinycolor({r, g, b}).lighten(15).saturate(20).toHexString(),
		lighten : tinycolor({r, g, b}).lighten(35).saturate(30).toHexString()
	}
}