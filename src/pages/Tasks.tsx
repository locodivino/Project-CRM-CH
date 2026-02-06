import { Layout } from "@/components/layout/Layout";
import { TasksHeader } from "@/components/tasks/TasksHeader";
import { TasksList } from "@/components/tasks/TasksList";
import { TasksFilters } from "@/components/tasks/TasksFilters";

export default function Tasks() {
  return (
    <Layout>
      <div className="flex-1 bg-background">
        <TasksHeader />
        
        <div className="p-6">
          <TasksFilters />
          <TasksList />
        </div>
      </div>
    </Layout>
  );
}