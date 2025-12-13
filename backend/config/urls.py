from django.contrib import admin
from django.urls import include, path
from rest_framework.routers import DefaultRouter

from org.viewsets import GuildViewSet, ClassRoleViewSet, MembershipViewSet, UserClassViewSet
from campaigns.viewsets import CampaignViewSet, QuestViewSet
from boards.viewsets import BoardViewSet, ColumnViewSet
from tasks.viewsets import TaskTemplateViewSet, TaskViewSet, TaskAssignmentViewSet, TaskChecklistItemViewSet
from reviews.viewsets import SubmissionViewSet, RubricViewSet, RubricCriterionViewSet, ReviewViewSet
from gamification.viewsets import BadgeViewSet, UserBadgeViewSet, XPTransactionViewSet
from calendar_app.viewsets import CalendarEventViewSet

router = DefaultRouter()
router.register(r"guilds", GuildViewSet)
router.register(r"class-roles", ClassRoleViewSet)
router.register(r"memberships", MembershipViewSet)
router.register(r"user-classes", UserClassViewSet)

router.register(r"campaigns", CampaignViewSet)
router.register(r"quests", QuestViewSet)

router.register(r"boards", BoardViewSet)
router.register(r"columns", ColumnViewSet)

router.register(r"task-templates", TaskTemplateViewSet)
router.register(r"tasks", TaskViewSet)
router.register(r"task-assignments", TaskAssignmentViewSet)
router.register(r"task-checklist-items", TaskChecklistItemViewSet)

router.register(r"submissions", SubmissionViewSet)
router.register(r"rubrics", RubricViewSet)
router.register(r"rubric-criteria", RubricCriterionViewSet)
router.register(r"reviews", ReviewViewSet)

router.register(r"badges", BadgeViewSet)
router.register(r"user-badges", UserBadgeViewSet)
router.register(r"xp-transactions", XPTransactionViewSet)

router.register(r"calendar-events", CalendarEventViewSet)

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/accounts/", include("accounts.urls")),
    path("api/", include(router.urls)),
]
