
from utils.start_database import db
from models.task import Task


# CREATE
def createTask(user_id, taskname, task_priority, task_description, taskstatus):
    
    newTask = Task(
        user_id=user_id,
        taskname=taskname,
        taskpriority=task_priority,
        taskdescription=task_description,
        taskstatus=taskstatus
    )
    
    db.session.add(newTask)

    try:
        # Commit para salvar as alterações no banco de dados
        db.session.commit()
        print("-> NOVA TAREFA CRIADA")

        return {
                'status': True,
                'message': 'Tarefa criada com sucesso!'
                }

    except:
        # Em caso de erro, faça rollback
        db.session.rollback()
        return {
                'status': False, 
                'message': 'Falha na criação da tarefa, favor tentar novamente'
                }


# READ
def getAllTasks():

    tasks = Task.query.all()

    arrTasks = []
    for task in tasks:

        arrTasks.append({
            "key": task.id,
            "taskname": task.taskname,
            "taskdescription": task.taskdescription,
            "taskpriority": task.taskpriority,
            "taskstatus": task.taskstatus
        })

    return arrTasks


def getTaskskByID(task_id):

    tasks = Task.query.filter_by(task_id=task_id).first()

    arrTasks = []
    for task in tasks:

        arrTasks.append({
            "key": task.id,
            "taskname": task.taskname,
            "taskdescription": task.taskdescription,
            "taskpriority": task.taskpriority,
            "taskstatus": task.taskstatus
        })

    return arrTasks


def getTaskskByUserID(user_id):

    # tasks = Task.query.get(user_id)
    tasks = Task.query.filter_by(user_id=user_id).all()

    return tasks


# UPDATE
def updateTask(task_id, taskname, task_description, task_priority, taskstatus):

    task = Task.query.get(task_id)

    if task:
        
        task.taskname = taskname
        task.taskdescription = task_description
        task.taskpriority = task_priority
        task.taskstatus = taskstatus
    
    db.session.add(task)

    try:
        # Commit para salvar as alterações no banco de dados
        db.session.commit()
        print("-> TAREFA ATUALIZADA")

        return {
                'status': True,
                'message': 'Tarefa atualizada com sucesso!'
                }

    except:
        # Em caso de erro, faça rollback
        db.session.rollback()
        return {
                'status': False, 
                'message': 'Falha na atualização da tarefa, favor tentar novamente'
                }


# DELETE
def deleteTask(task_id):

    task = Task.query.get(task_id)

    db.session.delete(task)

    try:
        
        # Commit para salvar as alterações no banco de dados
        db.session.commit()
        
        print("-> TAREFA EXCLUIDA")

        return {
                'status': True,
                'message': 'Tarefa excluida com sucesso!'
                }

    except:
        # Em caso de erro, faça rollback
        db.session.rollback()
        return {
                'status': False, 
                'message': 'Falha na exclusão da tarefa, favor tentar novamente'
                }