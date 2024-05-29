import { useState, useEffect } from "react";
import { TezosToolkit } from "@taquito/taquito";
type skinSettor = (skin:string)=>Promise<void>;
type useSkinOutput = [string, skinSettor];

const env = await (async()=>{
    const response = await fetch("/env.json");
    const file:{Creature:string} = await response.json();
    console.log(file.Creature);
    return file.Creature;
})();

const useSkin = (
    Tezos: TezosToolkit
):useSkinOutput => {
    const [Creature] = useState<string>(env);
    const [skin, _setSkin] = useState<string>("");

    const updateSkin = async () => {
        try{
            const contract = await Tezos.contract.at(Creature);
            const skin_op = await contract.contractViews.get_skin().executeView({ viewCaller: Creature });
            skin!=skin_op?_setSkin(skin_op):{};
        }
        catch{}
        finally{}
    };

    const setSkin = async (skin: string) => {
        try{
            const contract = await Tezos.wallet.at(Creature);
            const incubate_op = await contract.methodsObject.incubate(skin).send();
            await incubate_op.confirmation();
        }
        catch{}
        finally {await updateSkin();}
    };
    useEffect(() => {
        updateSkin();
    }, []);
    return [skin, setSkin];
};
export { useSkin }