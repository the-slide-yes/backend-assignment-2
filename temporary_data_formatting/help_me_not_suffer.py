file_path = "temporary_data_formatting/employeesRaw.txt"
output_path = "temporary_data_formatting/employees.txt"
output = []

def to_line(items: list) -> str:
    return ("{"
            f"ID: {items[0]},"
            f"Name: \"{items[1]}\","
            f"Position: \"{items[2]}\","
            f"Department: \"{items[3]}\","
            f"Email: \"{items[4]}\","
            f"Phone: \"{items[5]}\","
            f"BranchID: {items[6]}"
            "},\n")

with open(file_path, 'r') as file:
    _ = file.readline()

    for row in file.readlines():
        items = row.split("\t")

        output.append(to_line(items))

with open(output_path, 'w') as file:
    file.writelines(output)
