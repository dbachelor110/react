import { useState, useEffect } from "react";
import { TezosToolkit } from "@taquito/taquito";
const Creature = `KT1C8eVAxajftvXLHTV6nQUz2Xmyh9HbV589`
type skinSettor = (skin:string)=>Promise<void>;
type useSkinOutput = [string, skinSettor];
const useSkin = (
    Tezos: TezosToolkit
):useSkinOutput => {
    const [skin, _setSkin] = useState<string>("");

    const updateSkin = async () => {
        const contract = await Tezos.wallet.at(Creature);
        const skin_op = await contract.contractViews.get_skin().executeView({ viewCaller: Creature });
        return _setSkin(skin_op);
    };

    const setSkin = async (skin: string) => {
        const contract = await Tezos.wallet.at(Creature);
        const incubate_op = await contract.methodsObject.incubate(skin).send();
        await incubate_op.confirmation();
        await updateSkin();
    };
    useEffect(() => { updateSkin() }, []);
    return [skin, setSkin];
};
export { useSkin }