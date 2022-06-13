import { ElementKorpe, IndexedElementKorpe } from '../tipovi';

export const useKorpa = () => {
  const postaviUKorpu = (element: Omit<ElementKorpe, 'kolicina'>) => {
    if (!localStorage.getItem('korpa')) {
      localStorage.setItem('korpa', '{}');
    }

    // @ts-ignore
    const knjige = JSON.parse(localStorage.getItem('korpa')) as ElementKorpe[];

    knjige[element.id] = {
      ...element,
      kolicina: element.id in knjige ? knjige[element.id].kolicina + 1 : 1,
    };

    localStorage.setItem('korpa', JSON.stringify(knjige));
  };

  const dajKnjigeIzKorpe: () => IndexedElementKorpe = () => {
    return JSON.parse(localStorage.getItem('korpa') || '{}');
  };

  const izbrisiKnjigu = (id: number) => {
    if (!localStorage.getItem('korpa')) {
      localStorage.setItem('korpa', '{}');
    }

    const knjige = JSON.parse(
      // @ts-ignore
      localStorage.getItem('korpa')
    ) as IndexedElementKorpe;

    knjige[id] = {
      ...knjige[id],
      kolicina: knjige[id].kolicina - 1,
    };

    if (!knjige[id].kolicina) {
      delete knjige[id];
    }

    localStorage.setItem('korpa', JSON.stringify(knjige));
    return knjige;
  };

  return { postaviUKorpu, dajKnjigeIzKorpe, izbrisiKnjigu };
};
