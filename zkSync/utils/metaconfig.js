const { createCanvas } = require('canvas');


function createImageURI(metadata, index) {
  const canvas = createCanvas(200, 200);
  const ctx = canvas.getContext('2d');

  Object.entries(metadata.attributes).forEach(([attribute, value], idx) => {
    drawAttribute(ctx, attribute, value.value, 10, 10 * idx);
  });

  const filePath = path.join(__dirname, '..', 'images', `NFT_${index}.png`);
  const buffer = canvas.toBuffer('image/png');
  fs.writeFileSync(filePath, buffer);

  return `file://${filePath}`;
}

function drawAttribute(ctx, attribute, value, x, y) {
  // 여기에서 각 속성에 따라 그릴 내용을 정의합니다.
  ctx.fillStyle = 'black';
  ctx.font = '20px Arial';

  switch (attribute) {
    case 'acc':
      ctx.fillText(`액세서리: ${value}`, x, y);
      break;
    case 'background':
      ctx.fillStyle = value;
      ctx.fillRect(0, 0, 200, 200);
      break;
    case 'body':
      ctx.fillText(`몸체: ${value}`, x, y + 20);
      break;
    case 'eye':
      ctx.fillText(`눈: ${value}`, x, y + 40);
      break;
    case 'head':
      ctx.fillText(`머리: ${value}`, x, y + 60);
      break;
    case 'skin':
      ctx.fillText(`피부: ${value}`, x, y + 80);
      break;
    case 'wing':
      ctx.fillText(`날개: ${value}`, x, y + 100);
      break;
    default:
      break;
  }
}

const possibleValues = {
    acc: ['검', '방패', '활', '팔찌', '목걸이'],
    background: ['red', 'yellow', 'blue'],
    body: ['slim', 'fat', 'warrior'],
    eye: ['smile', 'angry', 'default'],
    head: ['short', 'curl', 'fomad'],
    skin: ['white', 'black', '어둡음'],
    wing: ['big', 'cute', 'lovely']
  };
  
  function getRandomValue(field) {
    const values = possibleValues[field];
    const randomIndex = Math.floor(Math.random() * values.length);
    return values[randomIndex];
  }
  
  function createMetadata(index) {
    return {
      name: `NFT ${index}`,
      description: "랜덤한 특성의 NFT",
      image: "https://example.com/image.png",
      attributes: [
        { trait_type: "액세서리", value: getRandomValue('acc') },
        { trait_type: "배경", value: getRandomValue('background') },
        { trait_type: "몸체", value: getRandomValue('body') },
        { trait_type: "눈", value: getRandomValue('eye') },
        { trait_type: "머리", value: getRandomValue('head') },
        { trait_type: "피부", value: getRandomValue('skin') },
        { trait_type: "날개", value: getRandomValue('wing') }
      ]
    };
  }

  const metadataCollection = Array.from({ length: 10 }, (_, index) => createMetadata(index));
  
  module.exports = metadataCollection;