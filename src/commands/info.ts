import ElrondClient from '../api';

export default async function () {
    let data = await ElrondClient.getData();

    return `\`\`\`
${JSON.stringify(data)}
\`\`\``;
}