function extraiLinks(arrLinks) {
    return arrLinks.map((objetoLink) => Object.values(objetoLink).join());
}

async function checaStatus (listaUrls) {
    
    const arrStatus = await Promise.all(
        listaUrls.map(async (url) => {
            try {
                const resposta = await fetch(url, { method: 'HEAD' });
                return `${resposta.status} - ${resposta.statusText}`;
            } catch (erro) {
                return manejaErros(erro);
            }
        })
    );

    return arrStatus;
}

function manejaErros(erro) {
    if (erro.cause.code === 'ENOTFOUND') {
        return 'link não encontrado';
    } else {
        return 'ocorreu algum erro';
    }
}

export default async function listaValidada(listaLinks) {
    const links = extraiLinks(listaLinks);
    const statusLinks = await checaStatus(links);

    return listaLinks.map((objeto, indice) => ({
        ...objeto,
        status: statusLinks[indice]
    }));
}
