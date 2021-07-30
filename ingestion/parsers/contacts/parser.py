from ingestion.parsers.common.pipeline_reader import PipelineReader


def main():
    pipeline = PipelineReader('pipeline.yaml')
    pipeline.start()


if __name__ == '__main__':
    main()
