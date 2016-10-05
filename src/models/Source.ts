import { Record } from 'immutable';

interface SourceProps {
  url: string;
  width: number;
}

export class Source extends Record<SourceProps>({
  url: null,
  width: null,
}) implements SourceProps {
  public url: string;
  public width: number;
};
