import requests

API_URL = "http://localhost:3000/api/v1"

def post_employee(employee: object):
    res = requests.post(
        url=f"{API_URL}/employees",
        json=employee
    )

def post_branch(branch: object):
    res = requests.post(
        url=f"{API_URL}/branches",
        json=branch
    )

def to_employee_json(line: str) -> object:
    items = line.strip().split("\t")

    return {
            "name": items[1],
            "position": items[2],
            "department": items[3],
            "email": items[4],
            "phone": items[5],
            "branchId": items[6],
        }

def to_branch_json(line: str) -> object:
    items = line.strip().split("\t")

    return {
            "name": items[1],
            "address": items[2],
            "phone": items[3],
        }

def post_file(file_path: str, post, to_json):
    with open(file_path, 'r') as file:
        _ = file.readline()

        for row in file.readlines():
            post(to_json(row))


post_file("temporary_data_formatting/branchesRaw.txt", post_branch, to_branch_json)
post_file("temporary_data_formatting/employeesRaw.txt", post_employee, to_employee_json)