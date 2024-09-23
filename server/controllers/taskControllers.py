
from config.db_config import db
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

        return newTask

    except:
        # Em caso de erro, faça rollback
        db.session.rollback()
        return None
    
    finally:
        db.session.close()


# READ
def getAllTasks():

    try:
        tasks = Task.query.all()

        return tasks

    except:
        return None
    
    finally:
        db.session.close()



def getTaskskByID(task_id):

    try:
        tasks = Task.query.filter_by(task_id=task_id).first()

        return tasks

    except:
        return None

    finally:
        db.session.close()


def getTaskskByUserID(user_id):

    try:
        tasks = Task.query.filter_by(user_id=user_id).all()

        return tasks
    
    except:
        return False
    
    finally:
        db.session.close()



# UPDATE
def updateTask(task_id, taskname, task_description, task_priority, taskstatus):

    try:
        task = Task.query.get(task_id)
        
        task.taskname = taskname
        task.taskdescription = task_description
        task.taskpriority = task_priority
        task.taskstatus = taskstatus
        
        db.session.add(task)

        # Commit para salvar as alterações no banco de dados
        db.session.commit()
        print("-> TAREFA ATUALIZADA")

        return task

    except:
        # Em caso de erro, faça rollback
        db.session.rollback()
        
        return False
    
    finally:
        db.session.close()


# DELETE
def deleteTask(task_id):

    task = Task.query.get(task_id)

    db.session.delete(task)

    try:
        # Commit para salvar as alterações no banco de dados
        db.session.commit()
        
        print("-> TAREFA EXCLUIDA")

        return task

    except:
        # Em caso de erro, faça rollback
        db.session.rollback()

        return False
    
    finally:
        db.session.close()