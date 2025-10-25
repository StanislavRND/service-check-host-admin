import { useEffect } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";
import { HiddenInput } from "../../../../shared/ui/hidden-input/HiddenInput";
import { Input } from "../../../../shared/ui/input/Input";
import { ModalLayoutMain } from "../../../../shared/ui/modal/ModalLayout";
import { Select } from "../../../../shared/ui/select/Select";
import styles from "./FormAgent.module.scss";

export interface AgentFormValues {
  a_uuid?: string;
  agent_name?: string;
  agent_hostname?: string;
  enabled?: boolean;
}

interface FormAgentProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (data: AgentFormValues) => void;
  onEdit: (data: AgentFormValues) => void;
  initialData?: AgentFormValues;
  isEdit?: boolean;
}

export const FormAgent = ({
  isOpen,
  onClose,
  onAdd,
  onEdit,
  initialData,
  isEdit = false,
}: FormAgentProps) => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm<AgentFormValues>({
    defaultValues: initialData || {
      agent_name: "",
      agent_hostname: "",
      enabled: true,
    },
  });

  useEffect(() => {
    if (initialData) {
      reset({
        agent_name: initialData.agent_name || "",
        agent_hostname: initialData.agent_hostname || "",
        enabled: initialData.enabled ?? true,
      });
    } else {
      reset({
        agent_name: "",
        agent_hostname: "",
        enabled: true,
      });
    }
  }, [initialData, reset]);

  const nameValue = watch("agent_name");
  const locationValue = watch("agent_hostname");
  const isActiveValue = watch("enabled");

  const handleClose = () => {
    reset({
      agent_name: "",
      agent_hostname: "",
      enabled: true,
    });
    clearErrors();
    onClose();
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value.toLowerCase();
    const filtered = inputValue.replace(/[^a-z0-9-]/g, "");
    setValue("agent_name", filtered);
  };
  const handleEnabledChange = (value: boolean) => {
    setValue("enabled", value);
  };

  const onSubmit: SubmitHandler<AgentFormValues> = async (data) => {
    if (isEdit) {
      onEdit({ ...data, a_uuid: initialData?.a_uuid });
    } else {
      onAdd(data);
    }
    reset(initialData || { agent_name: "", agent_hostname: "", enabled: true });
  };

	const options = [{'value': true, 'label': 'Активно'}, {'value': false, 'label': 'Неактивно'}]

  return (
    <ModalLayoutMain
      isOpen={isOpen}
      onClose={handleClose}
      onSubmit={handleSubmit(onSubmit)}
      loading={isSubmitting}
      isEdit={isEdit}
      title={" агента"}
    >
      <form className={styles.form}>
        <Input
          label="Название"
          placeholder="Маленькие латиница, цифры, тире"
          {...register("agent_name", {
            required: "Введите название агента",
            pattern: {
              value: /^[a-z0-9-]+$/,
              message: "Допустимы только латиница, цифры и тире",
            },
          })}
          maxLength={100}
          error={errors.agent_name?.message}
          value={nameValue}
          onChange={handleNameChange}
        />

        {isEdit && (
          <>
            <Input
              label="Местоположение"
              placeholder="Город"
              {...register("agent_hostname", {
                required: "Введите местоположение",
              })}
              error={errors.agent_hostname?.message}
              value={locationValue}
              onChange={(e) => setValue("agent_hostname", e.target.value)}
            />

            <div className={styles.inputWrapper}>
              <label>Статус</label>
              <HiddenInput {...register("enabled")} />
              <Select
                onChange={handleEnabledChange}
                value={isActiveValue}
                options={options}
                placeholder="Выберите статус"
                error={!!errors.enabled}
              />
            </div>
          </>
        )}
      </form>
    </ModalLayoutMain>
  );
};
