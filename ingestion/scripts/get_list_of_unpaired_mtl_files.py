import os


def parse(directory, valid_extensions):
    for filename in os.listdir(directory):
        if filename_check(filename, valid_extensions):
            base = os.path.splitext(filename)[0]
            if not os.path.isfile(os.path.join(directory, base + '.obj')):
                print(filename)
            else:
                continue


def filename_check(filename, valid_extensions=None):
    if valid_extensions is None:  # No extension means we will look into all the files
        return True
    return any(filename.endswith(e) for e in valid_extensions)


if __name__ == '__main__':
    parse('../data/neurons', ['.mtl'])
