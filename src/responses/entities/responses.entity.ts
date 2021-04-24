import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm'; //???

@Entity()
export class Response{

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "int" })
    publication_id: number;

    @Column({ length: 200, default: 'anon' })
    author: string;

    @Column({ length: 800, default: 'Vacio' })
    description: string;

    @CreateDateColumn({
        name: 'creation_at',
        type: 'timestamptz',
        default: () => 'CURRENT_TIMESTAMP',
      })
      creationAt: Date;
      
    @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    updatedAt: Date;
}
