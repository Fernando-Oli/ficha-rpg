"use client";
import { useState } from "react";

// Adiciona a tipagem para window.electron
declare global {
  interface Window {
    electron: {
      saveSheet: (
        character: Character
      ) => Promise<{ success: boolean; path?: string; error?: string }>;
      listarFichas: () => Promise<{
        sucess: boolean;
        fichas: Array<{
          filename: string;
          data: Character;
        }>;
      }>;
    };
  }
}
// const fichas = arquivos.map((file) => {
//     const content = fs.readFileSync(path.join(dir, file), 'utf-8');
//     return {
//       filename: file,
//       data: JSON.parse(content)
//     };
// O retorno esperado de listarFichas é um array de objetos com a estrutura:
// {
//   filename: string;
//   data: Character;
// }
//   });

// funções para gerar dados aleatórios
const classes = ["Guerreiro", "Mago", "Ladino", "Clérigo", "Arqueiro"];
const racas = ["Humano", "Elfo", "Anão", "Orc", "Halfling"];

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

type CharacterAttributes = {
  forca: number;
  destreza: number;
  constituicao: number;
  inteligencia: number;
  sabedoria: number;
  carisma: number;
};

type Character = {
  name: string;
  race: string;
  class: string;
  attributes: CharacterAttributes;
};

function generateCharacter(): Character {
  const generateName = () => {
    // const result = await fetch(
    //   "https://randommer.io/api/Name?nameType=firstname&Quantity=1&X-Api-Key=adab1730e19f4365b9672dd744addb31",
    //   {
    //     method: "GET",
    //     headers: {
    //       accept: "*/*",
    //       "X-Api-Key": "adab1730e19f4365b9672dd744addb31",
    //     },
    //   }
    // );
    // const name = await result.json();
    // console.log(name);
    const names = ["Carlos", "Jose", "Maria", "Catarina"];
    const number = Math.floor(Math.random() * 4);
    return names[number];
  };
  const name = `Heroi ${generateName()}`; // pode ser substituído por lista de nomes
  const race = racas[randomInt(0, racas.length - 1)];
  const clazz = classes[randomInt(0, classes.length - 1)];
  const attributes: CharacterAttributes = {
    forca: randomInt(1, 20),
    destreza: randomInt(1, 20),
    constituicao: randomInt(1, 20),
    inteligencia: randomInt(1, 20),
    sabedoria: randomInt(1, 20),
    carisma: randomInt(1, 20),
  };
  return { name, race, class: clazz, attributes };
}

export default function Home() {
  const [character, setCharacter] = useState<Character>(generateCharacter());
  const [status, setStatus] = useState("");
  const [sheetCreate, setSheetCreate] = useState<Character[]>([]);

  const regenerate = () => setCharacter(generateCharacter());
  const listarFichas = async () => {
    const result = await window.electron.listarFichas();
    setSheetCreate(result.fichas.map((ficha) => ficha.data));
  };
  const save = async () => {
    const result = await window.electron.saveSheet(character);
    if (result.success) setStatus("Salvo em: " + result.path);
    else setStatus("Erro: " + (result.error || "cancelado"));
  };

  return (
    <div className="max-w-xl mx-auto p-6 font-sans">
      <h1 className="text-2xl font-bold text-white mb-4">
        Gerador de Ficha de RP
      </h1>
      <div className="bg-gray-100 p-4 rounded shadow mb-4">
        <div>
          <strong>Nome:</strong> {character.name}
        </div>
        <div>
          <strong>Raça:</strong> {character.race}
        </div>
        <div>
          <strong>Classe:</strong> {character.class}
        </div>
        <div className="mt-2">
          <strong>Atributos:</strong>
        </div>
        <div className="grid grid-cols-3 gap-2 text-sm">
          {Object.entries(character.attributes).map(([k, v]) => (
            <div key={k} className="border p-2 rounded">
              {k}: {v}
            </div>
          ))}
        </div>
      </div>
      <div className="flex gap-2">
        <button
          onClick={regenerate}
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          Gerar Novo
        </button>
        <button
          onClick={save}
          className="px-4 py-2 bg-green-600 text-white rounded"
        >
          Salvar Ficha
        </button>
        <button
          onClick={listarFichas}
          className="px-4 py-2 bg-red-600 text-white rounded"
        >
          Buscar Personagens Criados
        </button>
      </div>
      <div className="mt-3 text-sm">{status}</div>

      <div className="py-2 text-white rounded mt-2">
        <h1>Personagens Criados</h1>
        {sheetCreate.map((e) => {
          return (
            <div className="border p-2 rounded" key={e.name}>
              <div>
                <strong>Nome:</strong> {e.name}
              </div>
              <div>
                <strong>Raça:</strong> {e.race}
              </div>
              <div>
                <strong>Classe:</strong> {e.class}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
