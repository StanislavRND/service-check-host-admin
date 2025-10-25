import { useState } from "react";
import {
  useCreateAgentMutation,
  useDeleteAgentMutation,
  useGetAgentAllQuery,
  useUpdateAgentMutation,
} from "../../../../shared/api/agent/agent";
import { PlusIcon } from "../../../../shared/ui/icons/PlusIcon";
import { FormAgent, type AgentFormValues } from "../formAgent/FormAgent";
import { AgentItem } from "./AgentItem";
import styles from "./AgentTable.module.scss";

export const AgentTable = () => {
  const { data: agentsData, isLoading } = useGetAgentAllQuery();
  const [createAgent] = useCreateAgentMutation();
  const [updateAgent] = useUpdateAgentMutation();
  const [deleteAgent] = useDeleteAgentMutation();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState<AgentFormValues | null>(
    null
  );

  const handleEditAgent = (agent: AgentFormValues) => {
    setSelectedAgent(agent);
    setIsEdit(true);
    setIsModalOpen(true);
  };

  const handleCreateAgent = async (data: AgentFormValues) => {
    await createAgent(data);
    setIsModalOpen(false);
    setSelectedAgent(null);
  };

  const handleUpdateAgent = async (data: AgentFormValues) => {
    if (data.a_uuid) {
      await updateAgent({ id: data.a_uuid, ...data });
    }
    setIsModalOpen(false);
    setIsEdit(false);
    setSelectedAgent(null);
  };

  const handleDeleteAgent = async (uuid: string) => {
    await deleteAgent(uuid);
  };

  const agents = agentsData || [];

  if (isLoading) return <div>Загрузка...</div>;

  return (
    <>
      <button
        className={styles.addBtn}
        onClick={() => {
          setIsEdit(false);
          setSelectedAgent(null);
          setIsModalOpen(true);
        }}
      >
        <PlusIcon color="rgb(230, 230, 230)" width={18} height={18} />
        Добавить агента
      </button>

      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Имя</th>
              <th>Хост</th>
              <th>Местоположение</th>
              <th>Последний хартбит</th>
              <th>Статус</th>
              <th>Токен</th>

              <th>Действия</th>
            </tr>
          </thead>
          <tbody>
            {agents.map((agent) => (
              <AgentItem
                key={agent.a_uuid}
                agent={agent}
                onDelete={handleDeleteAgent}
                onEdit={handleEditAgent}
              />
            ))}
          </tbody>
        </table>
      </div>

      <FormAgent
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setIsEdit(false);
          setSelectedAgent(null);
        }}
        onAdd={handleCreateAgent}
        onEdit={handleUpdateAgent}
        initialData={selectedAgent || undefined}
        isEdit={isEdit}
      />
    </>
  );
};
