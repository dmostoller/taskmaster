from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import TaskListViewSet, TaskViewSet

router = DefaultRouter()
router.register(r'tasklists', TaskListViewSet)

task_list_router = DefaultRouter()
task_list_router.register(r'tasks', TaskViewSet, basename='task')

urlpatterns = [
    path('', include(router.urls)),
    path('tasklists/<int:task_list_pk>/', include(task_list_router.urls)),
]