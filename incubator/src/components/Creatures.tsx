import { useState } from "react";
import { TezosToolkit } from "@taquito/taquito";
import List from "./List";
const Incubator = `KT1LSv5fJMYmFqj992sAoa3n7m4TkiGKMMDC`
const Creatures = ({
  Tezos,
}: {
  Tezos: TezosToolkit;
}): JSX.Element => {
  const [loading, setLoading] = useState<boolean>(false);
  const [creatures, setCreatures] = useState<string[]>([]);
  const addCreatures=(creaturesAddress:string)=>{
    const newCreatures = [...creatures, creaturesAddress];
    setCreatures(newCreatures);
  }

  const create_creature = async()=> {
    // create creature
    setLoading(true);
    const contract = await Tezos.wallet.at(Incubator);
    const create_creature_op = await contract.methodsObject.create_creature().send();
    const transactOp = await create_creature_op.transactionOperation()
    const internal_operation_results = transactOp?.metadata.internal_operation_results;
    if (internal_operation_results) {
        for (const result of internal_operation_results) {
            if ('result' in result) {
                const internalResult = result.result as any;
                if (internalResult.originated_contracts) {
                    addCreatures(internalResult.originated_contracts[0]);
                }
            }
        }
    }
    setLoading(false);
}

  return (
    <div id="creatures">
      <button
        type="button"
        className="button"
        onClick={create_creature}
      >
        {loading ? (
          <span>
            <i className="fas fa-spinner fa-spin"></i>Sending...
          </span>
        ) : (
          <span>
            <i className="far fa-paper-plane"></i>Send
          </span>
        )}
      </button>
      <List list={creatures} title="creatures"/>
    </div>
  );
};

export default Creatures;