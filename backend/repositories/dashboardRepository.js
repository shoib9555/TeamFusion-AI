const { Op } = require("sequelize");

const {
  Project,
  Board,
  Column,
  WorkspaceMember,
  Task,
  Sprint,
  User,
} = require("../models");
const countProjects = async (workspaceId) => {
  return await Project.count({
    where: {
      workspaceId,
    },
  });
};

const countBoards = async (workspaceId) => {
  return await Board.count({
    include: [
      {
        model: Project,
        as: "project",
        where: {
          workspaceId,
        },
      },
    ],
  });
};

const countMembers = async (workspaceId) => {
  return await WorkspaceMember.count({
    where: {
      workspaceId,
    },
  });
};

const countTasks = async (workspaceId) => {
  return await Task.count({
    include: [
      {
        model: Column,
        as: "column",
        required: true,
        include: [
          {
            model: Board,
            as: "board",
            required: true,
            include: [
              {
                model: Project,
                as: "project",
                required: true,
                where: {
                  workspaceId,
                },
              },
            ],
          },
        ],
      },
    ],
  });
};

const countActiveSprints = async (workspaceId) => {
  return await Sprint.count({
    where: {
      status: "ACTIVE",
    },
    include: [
      {
        model: Project,
        as: "project",
        required: true,
        where: {
          workspaceId,
        },
      },
    ],
  });
};

const countCompletedSprints = async (workspaceId) => {
  return await Sprint.count({
    where: {
      status: "COMPLETED",
    },
    include: [
      {
        model: Project,
        as: "project",
        required: true,
        where: {
          workspaceId,
        },
      },
    ],
  });
};

const countProjectTasks = async (projectId) => {
  return await Task.count({
    include: [
      {
        model: Column,
        as: "column",
        required: true,
        include: [
          {
            model: Board,
            as: "board",
            required: true,
            where: {
              projectId,
            },
          },
        ],
      },
    ],
  });
};

const countTasksByStatus = async (projectId, status) => {
  return await Task.count({
    where: {
      status,
    },
    include: [
      {
        model: Column,
        as: "column",
        required: true,
        include: [
          {
            model: Board,
            as: "board",
            required: true,
            where: {
              projectId,
            },
          },
        ],
      },
    ],
  });
};

const countSprintTasks = async (sprintId) => {
  return await Task.count({
    where: {
      sprintId,
    },
  });
};

const countCompletedSprintTasks = async (sprintId) => {
  return await Task.count({
    where: {
      sprintId,
      status: "DONE",
    },
  });
};

const getCompletedStoryPoints = async (sprintId) => {
  const total = await Task.sum("storyPoints", {
    where: {
      sprintId,
      status: "DONE",
    },
  });

  return total || 0;
};

const getRemainingStoryPoints = async (sprintId) => {
  const total = await Task.sum("storyPoints", {
    where: {
      sprintId,
      status: {
        [Op.ne]: "DONE",
      },
    },
  });

  return total || 0;
};

const countAssignedTasks = async (userId) => {
  return await Task.count({
    where: {
      assigneeId: userId,
    },
  });
};

const countCompletedTasks = async (userId) => {
  return await Task.count({
    where: {
      assigneeId: userId,
      status: "DONE",
    },
  });
};

const countOverdueTasks = async (userId) => {
  return await Task.count({
    where: {
      assigneeId: userId,
      dueDate: {
        [Op.lt]: new Date(),
      },
      status: {
        [Op.ne]: "DONE",
      },
    },
  });
};
const countTasksDueToday = async (userId) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const nextWeek = new Date(today);
  nextWeek.setDate(today.getDate() + 7);

  const startOfDay = new Date(today);
  startOfDay.setHours(0, 0, 0, 0);

  const endOfDay = new Date(today);
  endOfDay.setHours(23, 59, 59, 999);

  return await Task.count({
    where: {
      assigneeId: userId,
      dueDate: {
        [Op.between]: [startOfDay, endOfDay],
      },
      status: {
        [Op.ne]: "DONE",
      },
    },
  });
};

const getTasksByStatus = async (projectId) => {
  const tasks = await Task.findAll({
    attributes: ["status"],
    include: [
      {
        model: Column,
        as: "column",
        required: true,
        include: [
          {
            model: Board,
            as: "board",
            required: true,
            where: {
              projectId,
            },
          },
        ],
      },
    ],
  });

  const result = {
    TODO: 0,
    IN_PROGRESS: 0,
    TESTING: 0,
    DONE: 0,
  };

  tasks.forEach((task) => {
    result[task.status]++;
  });

  return result;
};
const getTasksByPriority = async (projectId) => {
  const tasks = await Task.findAll({
    attributes: ["priority"],
    include: [
      {
        model: Column,
        as: "column",
        required: true,
        include: [
          {
            model: Board,
            as: "board",
            required: true,
            where: {
              projectId,
            },
          },
        ],
      },
    ],
  });

  const result = {
    LOW: 0,
    MEDIUM: 0,
    HIGH: 0,
  };

  tasks.forEach((task) => {
    result[task.priority]++;
  });

  return result;
};

const getTasksByAssignee = async (projectId) => {
  const tasks = await Task.findAll({
    include: [
      {
        model: Column,
        as: "column",
        required: true,
        include: [
          {
            model: Board,
            as: "board",
            required: true,
            where: {
              projectId,
            },
          },
        ],
      },
      {
        model: User,
        as: "assignee",
        attributes: ["firstName", "lastName"],
        required: false,
      },
    ],
  });

  const result = {};

  tasks.forEach((task) => {
    const user = task.assignee
      ? `${task.assignee.firstName} ${task.assignee.lastName}`
      : "Unassigned";

    result[user] = (result[user] || 0) + 1;
  });

  return Object.entries(result).map(([user, tasks]) => ({
    user,
    tasks,
  }));
};

const getOverdueTasks = async (projectId) => {
  return await Task.findAll({
    attributes: ["id", "title", "priority", "status", "dueDate"],

    include: [
      {
        model: Column,
        as: "column",
        required: true,
        include: [
          {
            model: Board,
            as: "board",
            required: true,
            where: {
              projectId,
            },
          },
        ],
      },
      {
        model: User,
        as: "assignee",
        attributes: ["firstName", "lastName"],
        required: false,
      },
    ],

    where: {
      dueDate: {
        [Op.lt]: new Date(),
      },

      status: {
        [Op.ne]: "DONE",
      },
    },
  });
};

const getUpcomingTasks = async (projectId) => {
  const today = new Date();

  const nextWeek = new Date();
  nextWeek.setDate(today.getDate() + 7);

  return await Task.findAll({
    attributes: ["id", "title", "priority", "status", "dueDate"],

    include: [
      {
        model: Column,
        as: "column",
        required: true,
        include: [
          {
            model: Board,
            as: "board",
            required: true,
            where: {
              projectId,
            },
          },
        ],
      },
      {
        model: User,
        as: "assignee",
        attributes: ["firstName", "lastName"],
        required: false,
      },
    ],

    where: {
      dueDate: {
        [Op.between]: [today, nextWeek],
      },

      status: {
        [Op.ne]: "DONE",
      },
    },

    order: [["dueDate", "ASC"]],
  });
};

const getSprintVelocity = async (projectId) => {
  const sprints = await Sprint.findAll({
    where: {
      projectId,
    },

    include: [
      {
        model: Task,
        as: "tasks",
        attributes: ["storyPoints", "status"],
      },
    ],

    order: [["createdAt", "ASC"]],
  });

  return sprints.map((sprint) => {
    let completedStoryPoints = 0;

    sprint.tasks.forEach((task) => {
      if (task.status === "DONE") {
        completedStoryPoints += task.storyPoints || 0;
      }
    });

    return {
      sprint: sprint.name,
      completedStoryPoints,
    };
  });
};

const getBurndownData = async (projectId) => {
  const sprint = await Sprint.findOne({
  where: {
    projectId,
    status: {
      [Op.in]: ["ACTIVE", "COMPLETED"],
    },
  },

  order: [["endDate", "DESC"]],

  include: [
    {
      model: Task,
      as: "tasks",
      attributes: [
        "storyPoints",
        "completedAt",
        "status",
      ],
    },
  ],
});

  if (!sprint) {
    return [];
  }

  const startDate = new Date(sprint.startDate);
  const endDate = new Date(sprint.endDate);

  const burndown = [];

  let totalStoryPoints = sprint.tasks.reduce(
    (sum, task) => sum + (task.storyPoints || 0),
    0
  );

  for (
  let date = new Date(startDate);
  date <= endDate;
  date.setDate(date.getDate() + 1)
) {
  let remaining = totalStoryPoints;

  sprint.tasks.forEach((task) => {
    if (!task.completedAt) {
      return;
    }

    const completedDate = new Date(task.completedAt);
    completedDate.setHours(0, 0, 0, 0);

    const currentDate = new Date(date);
    currentDate.setHours(0, 0, 0, 0);

    if (completedDate <= currentDate) {
      remaining -= task.storyPoints || 0;
    }
  });

  burndown.push({
    date: date.toISOString().split("T")[0],
    remainingStoryPoints: remaining,
  });
}

  return burndown;
};
module.exports = {
  countProjects,
  countBoards,
  countMembers,
  countTasks,
  countActiveSprints,
  countCompletedSprints,
  countProjectTasks,
  countTasksByStatus,
  countSprintTasks,
  countCompletedSprintTasks,
  getCompletedStoryPoints,
  getRemainingStoryPoints,
  countAssignedTasks,
  countCompletedTasks,
  countOverdueTasks,
  countTasksDueToday,
  getTasksByStatus,
  getTasksByPriority,
  getTasksByAssignee,
  getOverdueTasks,
  getUpcomingTasks,
  getSprintVelocity,
  getBurndownData,
};
