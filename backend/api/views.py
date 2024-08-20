from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action
from .models import TaskList, Task
from .serializers import TaskListSerializer, TaskSerializer

class TaskListViewSet(viewsets.ModelViewSet):
    queryset = TaskList.objects.all()
    serializer_class = TaskListSerializer

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)    
    
    @action(detail=True, methods=['patch'])
    def update_name(self, request, pk=None):
        task_list = self.get_object()
        task_list.name = request.data.get('name', task_list.name)
        task_list.save()
        return Response({'status': 'name updated'})

class TaskViewSet(viewsets.ModelViewSet):
    serializer_class = TaskSerializer

    def get_queryset(self):
        task_list_id = self.kwargs['task_list_pk']
        return Task.objects.filter(task_list_id=task_list_id)

    def perform_create(self, serializer):
        task_list_id = self.kwargs['task_list_pk']
        task_list = TaskList.objects.get(id=task_list_id)
        serializer.save(task_list=task_list)
    
    @action(detail=True, methods=['post'])
    def mark_complete(self, request, task_list_pk=None, pk=None):
        task = self.get_object()
        task.completed = True
        task.save()
        return Response(TaskSerializer(task).data)

    @action(detail=True, methods=['post'])
    def mark_incomplete(self, request, task_list_pk=None, pk=None):
        task = self.get_object()
        task.completed = False
        task.save()
        return Response(TaskSerializer(task).data)