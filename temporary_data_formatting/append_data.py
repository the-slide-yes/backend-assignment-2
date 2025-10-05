import requests

API_URL = "http://localhost:3000/api/v1"
"""The url of the api."""

def post_employee(employee: object):
    """Posts an employee to the api."""

    requests.post(
        url=f"{API_URL}/employees",
        json=employee
    )

def post_branch(branch: object):
    """Posts a branch to the api."""

    requests.post(
        url=f"{API_URL}/branches",
        json=branch
    )

def to_employee_json(line: str) -> object:
    """Converts a row from the table copied from learn into a json object.
    
    Returns:
        The JSON representation of the row.
    """

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
    """Converts a row from the table copied from learn into a json object.
    
    Returns:
        The JSON representation of the row.
    """

    items = line.strip().split("\t")

    return {
            "name": items[1],
            "address": items[2],
            "phone": items[3],
        }

def post_file(file_path: str, post, to_json):
    """Posts all rows of a text file through a post function.
    
    Args:
        file_path (str): The path to the file to be used.
        post: The post function which posts each row.
        to_json: The conversion function from row string to json object.
    """
    with open(file_path, 'r') as file:
        _ = file.readline()

        for row in file.readlines():
            post(to_json(row))


post_file("temporary_data_formatting/branches.txt", post_branch, to_branch_json)
post_file("temporary_data_formatting/employees.txt", post_employee, to_employee_json)