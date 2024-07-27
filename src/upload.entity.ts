import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class UploadEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  filename: string;

  @Column({ type: 'bytea', nullable: true })
  data: Uint8Array;

  @Column()
  mimetype: string;
}
