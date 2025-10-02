def to_employee_line(items: list) -> str:
    return ("{"
            f"id: {items[0]}, "
            f"name: \"{items[1]}\", "
            f"position: \"{items[2]}\", "
            f"department: \"{items[3]}\", "
            f"email: \"{items[4]}\", "
            f"phone: \"{items[5]}\", "
            f"branchId: {items[6]}"
            "},\n")

def to_branch_line(items: list) -> str:
    return ("{"
            f"id: {items[0]}, "
            f"name: \"{items[1]}\", "
            f"address: \"{items[2]}\", "
            f"phone: \"{items[3]}\""
            "},\n")

def reformat(raw_file_path: str, output_path: str, to_line):
    output = []

    with open(raw_file_path, 'r') as file:
        _ = file.readline()

        for row in file.readlines():
            items = row.strip().split("\t")

            output.append(to_line(items))

    with open(output_path, 'w') as file:
        file.writelines(output)

reformat("temporary_data_formatting/branchesRaw.txt", "temporary_data_formatting/branches.txt", to_branch_line)
reformat("temporary_data_formatting/employeesRaw.txt", "temporary_data_formatting/employees.txt", to_employee_line)
