import axios from 'axios';
import fs, { WriteStream } from 'fs';
import path from 'path';

const baseURL:string = 'https://dadosabertos.rfb.gov.br/CNPJ/';
const endpoints = [
    'Empresas0.zip', 'Empresas1.zip', 'Empresas2.zip', 'Empresas3.zip', 'Empresas4.zip', 'Empresas5.zip', 'Empresas6.zip', 'Empresas7.zip', 'Empresas8.zip', 'Empresas9.zip', 'Estabelecimentos0.zip', 'Estabelecimentos1.zip', 'Estabelecimentos2.zip', 'Estabelecimentos3.zip', 'Estabelecimentos4.zip', 'Estabelecimentos5.zip', 'Estabelecimentos6.zip', 'Estabelecimentos7.zip', 'Estabelecimentos8.zip', 'Estabelecimentos9.zip', 'Simples.zip', 'Socios1.zip', 'Socios2.zip', 'Socios3.zip', 'Socios4.zip', 'Socios5.zip', 'Socios6.zip', 'Socios7.zip', 'Socios8.zip', 'Socios9.zip'
];

async function downloadFile(endpoint:string) {
    const url:string = `${baseURL}${endpoint}`;
    const fileName:string = path.basename(endpoint);

    console.log(`Baixando ${fileName} de ${url}`);

    try{
        const response:any = await axios({
            url: url,
            method: 'GET',
            responseType: 'stream'
        });

        const filePath:string = path.join("./downloads", fileName);
        const writer:WriteStream = fs.createWriteStream(filePath);
        response.data.pipe(writer)

        return new Promise((resolve, reject) => {
            writer.on('finish', resolve);
            writer.on('error', reject)
        });
    } catch(error) {
        console.error(`Erro ao baixar ${fileName}: ${error}`);
    }

}

async function main() {
    for (let endpoint of endpoints) {
        await downloadFile(endpoint);
    }
    console.log('Downloads concluídos')
}

main();
