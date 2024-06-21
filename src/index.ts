import axios from 'axios';
import fs, { WriteStream } from 'fs';
import path, { resolve } from 'path';

const baseURL:string = 'https://dadosabertos.rfb.gov.br/CNPJ/';
const endpoints = [
    'Empresas0','Empresas1','Empresas2','Empresas3', 'Empresas4', 'Empresas5','Empresas6','Empresas7','Empresas8', 'Empresas9','Estabelecimentos0','Estabelecimentos1','Estabelecimentos2','Estabelecimentos3','Estabelecimentos4','Estabelecimentos5','Estabelecimentos6','Estabelecimentos7','Estabelecimentos8','Estabelecimentos9','Simples','Socios1','Socios2','Socios3','Socios4','Socios5','Socios6','Socios7','Socios8','Socios9'
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

        const filePath:string = path.join(__dirname, fileName);
        const writer:WriteStream = fs.createWriteStream(filePath);
        response.data.pipe(writer)

        return new Promise((resolve, reject) => {
            writer.on('finish', resolve);
            writer.on('error', reject)
        });
    } catch(error) {
        console.error(`Erro ao baixar ${fileName}`);
    }

}

async function main() {
    for (let endpoint of endpoints) {
        await downloadFile(endpoint);
    }
    console.log('Downloads concluídos')
}

main();
