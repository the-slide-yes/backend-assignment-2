file_path = "temporary_data_formatting/branchesRaw.txt"
output_path = "temporary_data_formatting/branches.txt"
output = []
def to_line(items: list) -> str:
    return ("{"
            f"id: {items[0]},"
            f"name: \"{items[1]}\","
            f"address: \"{items[2]}\","
            f"phone: \"{items[3].strip()}\""
            "},\n")

with open(file_path, 'r') as file:
    _ = file.readline()

    for row in file.readlines():
        items = row.split("\t")

        output.append(to_line(items))

with open(output_path, 'w') as file:
    file.writelines(output)
